import React from 'react';
import $ from 'jquery';

var AnnotationItem = React.createClass({

    saveItem: function () {
        console.log('updating annotation');
        this.props.data.text = this.refs.annotation.getDOMNode().value;
        $('#airlock').annotator().annotator('updateAnnotation', this.props.data);
    },

    deleteItem: function () {
        console.log('deleting annotation');
        $('#airlock').annotator().annotator('deleteAnnotation', this.props.data);
    },

    origHighlightClassName: undefined,

    getAnnotationDOMElement: function() {
        return $('span[data-annotation-id="@"]'.replace('@', this.props.data.id));
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