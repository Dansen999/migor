$.widget("hpip.form", {
    tabs: null,
    elements:[],
    options: {
        data: null,
        elementOptions: [{name:"test", label:"Test"}],
        errorClass: 'ui-state-error ui-corner-all'
    },
    _create:function () {
        this._load();
    },
    _setOptions: function() {
        this._superApply( arguments );
        this._load();
    },
    _load: function() {
        var self = this;


        self.element.empty();
        self.elements = [];

        self.tabs = $('<div></div>');
        var tabsHeader = $('<ul></ul>');

        $.each(self.options.elementOptions.tabs, function(index, item) {
            self._createTabContent(item, tabsHeader, self.tabs, index);
        });

        if (self.options.elementOptions.tabs.length > 1) {

            self.tabs.prepend(tabsHeader);
            self.tabs.tabs({});
        }

        self.element.append(self.tabs);

    },
    _createTabContent: function(item, tabsHeader, content, tabIndex) {
        var self = this;
        tabsHeader.append('<li><a href="#tab-'+item.title+'">'+item.title+'</a></li>');

        var tabContent = $('<div id="tab-'+item.title+'"></div>');
        var message = $('<p class="form-error-message error-message ui-state-error ui-corner-all" style="display: none; text-align: center;"></p>');
        tabContent.append(message);

        for (var i=0; i<item.options.length; i++) {
            var elementOptions = item.options[i];

            if (self.options.data != null) {
                elementOptions = hpip.utils.mergeJson(elementOptions, {full: self.options.data, value: self.options.data[elementOptions.name]});
            }

            var element = $('<p></p>').formElement(elementOptions);

            if (!item.options[i].readOnly) {
                self.elements.push({name: item.options[i].name, element: element, tabIndex: tabIndex});
            }
            tabContent.append(element);
        }
        content.append(tabContent);
    },
    getElement: function(name) {
        var self = this;
        for (var i=0; i<self.elements.length; i++) {
            if (self.elements[i].name == name) {
                return self.elements[i].element;
            }
        }
        return null;
    },
    reset: function() {
        var self = this;
        self.element.find('p.form-error-message')
            .removeClass(this.options.errorClass)
            .html('')
            .hide();
        $.each(self.elements, function(index, item) {
            item.element.formElement('resetError');
        });
    },
    markViolations: function(data) {
        var self = this;

        if (data.errorMessage != null) {
            self.element.find('p.form-error-message')
                .addClass(this.options.errorClass)
                .html(data.errorMessage)
                .show();
        }

        var firstTab = null;
        for (var key in data.affectedFields) {
            $.each(self.elements, function(index, item) {
                if (item.name == key) {
                    item.element.formElement('setError', data.affectedFields[key]);

                    if (firstTab == null) {
                        firstTab = item.tabIndex
                    }
                }
            });
        }
        if (self.options.elementOptions.tabs.length > 1 && firstTab != null) {
            self.tabs.tabs({active: firstTab});
        }
    },
    values: function() {
        var result = {};
        for (var i=0; i<this.elements.length; i++) {
            result[this.elements[i].name] = this.elements[i].element.formElement('value');
        }
        return result;
    }
});

$.widget("hpip.formElement", {

    input: null,
    errorMessage: null,

    options:{
        // display options
        disabled: false,
        readOnly: false,

        // options
        name: null,  // name of the input value
        label: null, // label
        value: null, // initial value
        type: 'text',// element type
        mandatory: false, // at the moments it simple adds an * to the table

        // holder for the full form options
        full: null,

        // Callbacks
        preCreate: null, // executed before calling a widget (e.g. multiselect)
        postCreate: null, // executed after creating the form element
        changeElement: null, // executed when changing state of a form element, e.g. select field
        getElementValue: null, // overrides routine for reading the value from a form element

        // classes
        errorClass: 'ui-state-error ui-corner-all'
    },
    _create:function () {
        this._load();
    },
    _setOptions: function() {
        this._superApply( arguments );
        this._load();
    },
    _load: function() {
        var self = this;

        self.element.empty();
        self.element.attr('id', 'form-element-'+self.options.name);
        self.element.addClass('form-element');


        var label = '';
        if (self.options.label != null) {
            label = $('<label class="form-element"></label>').append(self.options.label + ': ' + (self.options.mandatory?'*':''));
        } else {
            label = $('<div></div>');
        }
        var value = self.options.value == null ? '' : self.options.value;

        switch (self.options.type) {
            case 'hidden':
                self.input = $('<input name="'+self.options.name+'" type="hidden" class="form-element" value="'+value+'"/>');
                label = self.input;
                self.element.hide();
                break;
            case 'textOnly':
                self.input = $('<span name="'+self.options.name+'" style="text-align: left;" class="form-element">'+value+'</span>');
                label.append(self.input);
                break;
            case 'button':
                self.input = $('<button"></button>');
                self.input.button( {
                    label: self.options.name
                });
                if (typeof(self.options.click) === 'function') {
                    self.input.on('click', function() {
                        self.options.click(self.element, self.input, self.options);
                    });
                }
                label.append(self.input);
                break;
            case 'select':
                self.input = $('<select name="'+self.options.name+'" class="form-element"></select>');
                if (typeof(self.options.changeElement) === 'function') {
                    self.input.change(function() {
                        self.options.changeElement(self.element, self.input, self.options);
                    });
                }
                label.append(self.input);
                break;
            case 'multiselect':
                self.input = $('<select style="width: 380px; height: 200px;" name="'+self.options.name+'[]" multiple="multiple" class="multiselect"></select>');
                if (typeof(self.options.changeElement) === 'function') {
                    self.input.change(function() {
                        self.options.changeElement(self.element, self.input, self.options);
                    });
                }
                label.append(self.input);
                if (typeof(self.options.preCreate) === 'function') {
                    self.options.preCreate(self.element, self.input, self.options);
                }
                self.input.multiselect({
                    sortable: false,
                    searchable: true,
                    doubleClickable: true,
                    dividerLocation: 0.5,
                    attribute: 'chosen'
                });

                break;

            case 'textarea':
                if (self.options.idAttributeName != null) {
                    self.input = $('<textarea name="'+self.options.name+'" class="form-element" id="'+self.options.idAttributeName+'" style="'+self.options.cssStyle+'">'+value+'</textarea>');
                } else {
                    self.input = $('<textarea name="'+self.options.name+'" class="form-element" style="'+self.options.cssStyle+'">'+value+'</textarea>');
                }
                label.append(self.input);
                break;
            case 'iframe':
                if (self.options.idAttributeName != null) {
                    self.input = $('<iframe name="'+self.options.name+'" class="form-element" id="'+self.options.idAttributeName+'" style="'+self.options.cssStyle+'" src="'+value+'"></iframe>');
                } else {
                    self.input = $('<iframe name="'+self.options.name+'" class="form-element" style="'+self.options.cssStyle+'" src="'+value+'"></iframe>');
                }
                label.append(self.input);
                break;
            case 'image':
                self.input = $('<p style="text-align: center;"><img alt="city image" height="200" src="'+value+'"></p>');
                label.append(self.input);
                break;
            case 'password':
                self.input = $('<input name="'+self.options.name+'" type="password" class="form-element" value="'+value+'"/>');
                break;
            case 'checkbox':
                self.input = $('<input name="'+self.options.name+'" align="left" type="checkbox" class="form-element" ' +(value?'checked="checked"':'')+ '/>');
                label.append(self.input);
                break;
            case 'file':
                self.input = $('<input name="'+self.options.name+'" align="left" type="file" class="form-element fileUpload" ' +(value?'checked="checked"':'')+ '/>');
                label.append(self.input);
                break;
            case 'table':
                // this are all the keys as the array Object.keys(self.options.value[0])
                // this is the first array element Object.keys(self.options.value[0])[]
                var tableMarkup = "";    //dodaj NULL pointer check
                if (self.options.value != null) {
                    tableMarkup += "<tr>";
                    $.each(Object.keys(self.options.value[0]), function( index, value ) {
                        tableMarkup += "<th>"+value+"</th>"
                    });
                    tableMarkup += "</tr>";
                    for (var i = 0; i < self.options.value.length; i++) {
                        tableMarkup += "<tr>";
                        $.each(self.options.value[i], function( key, value1 ) {
                            tableMarkup += "<td>"+value1+"</td>"
                        });
                        tableMarkup += "</tr>";
                    }
                    self.input = $('<table class="form-element" style="width: 100%;"><tbody>'+tableMarkup+'</tbody><table/>');
                } else {
                    self.input = $('<span name="'+self.options.name+'" style="text-align: left;" class="form-element"></span>');
                }
                label.append(self.input);
                break;
            default:
                self.input = $('<input name="'+self.options.name+'" class="form-element" type="text" style="'+self.options.cssStyle+'" value="'+value+'"/>');
                label.append(self.input);
                break;
        }

        // read only
        if (self.options.readOnly || self.options.disabled) {
            self.input.attr('readonly', 'readonly');
            self.input.attr('disabled', 'disabled');
        }

        // create callback
        if (typeof(self.options.postCreate) === 'function') {
            self.options.postCreate(self.element, self.input, self.options);
        }

        self.errorMessage = $('<p class="form-element-error-message" style="display: none;"></p>');
        self.element.append(self.errorMessage);
        self.element.append(label);
    },

    /**
     * @return name of the element
     */
    name: function() {
        var self = this;
        return self.options.name;
    },
    /**
     * @return current value of the element
     */
    value: function() {
        var self = this;

        var value = null;
        if (typeof(self.options.getElementValue) === 'function') {
            return self.options.getElementValue(self.element, self.input, self.options);
        }
        switch (self.options.type) {
            case 'checkbox':
                value = self.input.is(':checked');
                break;
            case 'multiselect':
                value = [];
                $.each(self.input.find('option[chosen="chosen"]'), function(index, item) {
                    value.push(item.attr('value'));
                });
                break;
            default:
                value = self.input.val();
                break;
        }
        return value;
    },
    /**
     * Set visibility of the element
     *
     * @param bool boolean value, true will call show() on the element, false calls hide().
     */
    setVisible: function(bool) {
        if (bool) {
            this.element.show();
        } else {
            this.element.hide();
        }
    },
    /**
     * Marks element, that input is invalid.
     *
     * @param message error message
     */
    setError: function(message) {
        this.errorMessage.html(message === undefined?'':message).show();
        this.element.addClass(this.options.errorClass);
    },
    resetError: function() {
        this.errorMessage.html('').hide();
        this.element.removeClass(this.options.errorClass);
    }
});

