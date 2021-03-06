import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ObjectUtils from '../utils/ObjectUtils';

export class AutoCompletePanel extends Component {

    static defaultProps = {
        suggestions: null,
        field: null,
        appendTo: null,
        itemTemplate: null,
        onItemClick: null,
        scrollHeight: '200px'
    }

    static propTypes = {
        suggestions: PropTypes.array,
        field: PropTypes.string,
        appendTo: PropTypes.any,
        itemTemplate: PropTypes.func,
        onItemClick: PropTypes.func,
        scrollHeight: PropTypes.string
    };

    renderElement() {
        let items;

        if (this.props.suggestions) {
            items = this.props.suggestions.map((suggestion, index) => {
                let itemContent = this.props.itemTemplate ? this.props.itemTemplate(suggestion) : this.props.field ? ObjectUtils.resolveFieldData(suggestion, this.props.field) : suggestion;

                return (
                    <li key={index + '_item'} className="p-autocomplete-list-item" onClick={(e) => this.props.onItemClick(e, suggestion)}>{itemContent}</li>
                );
            });
        }

        return (
            <div ref={(el) => this.element = el} className="p-autocomplete-panel p-input-overlay p-shadow" style={{ maxHeight: this.props.scrollHeight }}>
                <ul className="p-autocomplete-items p-autocomplete-list p-component p-reset">
                    {items}
                </ul>
            </div>
        );
    }

    render() {
        let element = this.renderElement();

        if (this.props.appendTo) {
            return ReactDOM.createPortal(element, this.props.appendTo);
        }
        else {
            return element;
        }
    }
}