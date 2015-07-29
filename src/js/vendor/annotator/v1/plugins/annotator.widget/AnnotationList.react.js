import React from 'react';
import AnnotationItem from './AnnotationItem.react.js!jsx';
import Actions from './AnnotationActions';
import Store from './AnnotationsStore';

var AnnotationList = React.createClass({

    getInitialState: function() {
        return Store.getState();
    },

    onChange(state) {
        console.log('annoationList onChange',state);
        this.setState(state);
    },

    componentWillMount: function() {
        Store.listen(this.onChange);
        Actions.loadAnnotations(this.props.annotations);
    },

    componentWillUnmount: function() {
        Store.unlisten(this.onChange);
    },

    sortByAppereanceInDocument: function(annotations) {
        var DOMAnnotations = document.querySelectorAll('.annotator-hl');
        // slice.call converts NodeList to Array before applying map
        return Array.prototype.slice.call(DOMAnnotations).map(function(element) {
            return annotations.filter(function(el) {
                return el.id === element.getAttribute('data-annotation-id');
            })[0]; // get the single element of the array returned by filter()
        });
    },

    render: function() {
        console.log('this state',this.state.annotations);

        var sortedAnnotations = this.sortByAppereanceInDocument(this.state.annotations);
        var annotations = sortedAnnotations.map(function (annotation) {
            return (
                <AnnotationItem data={annotation} key={annotation.id} />
            );
        });

        return (
            <div className="annotations">
                {annotations}
            </div>
        );
    }
});

export default AnnotationList;