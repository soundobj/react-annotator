import alt from '../../../../../alt';

class AnnotationActions {

    loadAnnotations(annotations){
        console.log('AnnotationActions loading annotations',annotations);
        this.dispatch({annotations});
    }

}

export default alt.createActions(AnnotationActions);