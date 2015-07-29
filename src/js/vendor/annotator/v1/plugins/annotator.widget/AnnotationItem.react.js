import React from 'react';
import $ from 'jquery';
import scrollIntoView from '../../../../jquery/plugins/jquery.scrollintoview.min';

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
    annotationDOMElement: undefined,

    getAnnotationDOMElement: function() {
        if(!this.annotationDOMElement) {
            this.annotationDOMElement =
                $('span[data-annotation-id="@"]'.replace('@', this.props.data.id));
            return this.annotationDOMElement;
        }
        return this.annotationDOMElement;
    },

    highlightAnnotation: function () {
        this.origHighlightClassName = this.getAnnotationDOMElement().attr('class');
        this.getAnnotationDOMElement().attr('class','highlightTextActive');
    },

    resetHighlightAnnotation: function () {
        this.getAnnotationDOMElement().attr('class',this.origHighlightClassName);
    },

    scrollAnnotationIntoView: function () {
        console.log('scrolling into view');
        this.getAnnotationDOMElement().scrollintoview({duration: 1500});
    },

    render: function() {
        console.log('id',this.props.data.id);
        return (
            <div className="annotation" onClick={this.scrollAnnotationIntoView}>
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
                          id={this.props.data.id}
                    >
                    {this.props.data.text}
                </textarea>
            </div>
        );
    }
});

export default AnnotationItem;