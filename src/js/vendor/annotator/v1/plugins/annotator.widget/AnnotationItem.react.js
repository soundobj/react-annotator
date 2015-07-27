import React from 'react';
import $ from 'jquery';
import annotator from '../../pkg/annotator.min';

var AnnotationItem = React.createClass({

    saveItem: function () {
        let value = this.refs.annotation.getDOMNode().value;
        this.props.data.text = value;

        window.Annotator.updateAnnotation(
            this.props.data,
            this.getAnnotationDOMElement()
        );
        console.log('saving anotation',annotator);
    },

    deleteItem: function () {
        console.log('deleting annotation');
    },

    origHighlightClassName: undefined,
    AnnotationSelector: 'span[data-annotation-id="XXX"]',
    selectorPlaceHolder: 'XXX',

    getAnnotationDOMElement: function() {
        return $(this.AnnotationSelector.replace(
            this.selectorPlaceHolder,
            this.props.data.id));
    },

    highlightAnnotation: function () {
        let selectedAnnotation = this.getAnnotationDOMElement();
        this.origHighlightClassName = $(selectedAnnotation).attr('class');

        $(selectedAnnotation).attr('class','highlightTextActive');
    },

    resetHighlightAnnotation: function () {
        let selectedAnnotation = this.getAnnotationDOMElement();
        $(selectedAnnotation).attr('class',this.origHighlightClassName);
    },


    render: function() {
        console.log('id',this.props.data.id);
        return (
            <div className="annotation">
                <div className="actions">
                    <button ref="delete" onClick={this.deleteItem}>
                        Delete
                    </button>
                    <button ref="save" onClick={this.saveItem}>
                        Save
                    </button>
                </div>
                <textarea ref="annotation"
                          rows="4"
                          cols="30"
                          name="annotation"
                          //value={this.props.data.text}
                          //onChange={this.saveItem}
                          onMouseEnter={this.highlightAnnotation}
                          onMouseLeave={this.resetHighlightAnnotation}
                    >
                    {this.props.data.text}
                </textarea>
            </div>
        );
    }
});

export default AnnotationItem;