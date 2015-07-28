import alt from '../../../../../alt';

class AnnotationActions {

    loadAnnotations(annotations){
        console.log('AnnotationActions loading annotations',annotations);
        this.dispatch({annotations});
    }

    deleteAnnotation(annotation){
        console.log('Annotation Actions deleting annotation',annotation);
        this.dispatch({annotation});
    }

    addAnnotation(annotation){
        console.log('Annotation Actions added annotation',annotation);
        this.dispatch({annotation});
    }
}

export default alt.createActions(AnnotationActions);