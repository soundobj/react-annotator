import alt from '../../../../../alt';
import Actions from './AnnotationActions';

let storeID = 'AnnotationsStore';

class AnnotationsStore {

    constructor() {
        console.log('Actions',Actions);
        this.bindActions(Actions);
        this.annotations = [];
    }

    loadAnnotations({annotations}){
        console.log('annotationsStore loadAnnotations',annotations);
        this.annotations = annotations;

    }

    deleteAnnotation({annotation}){
        console.log('annotationsStore delete',annotations);
        this.annotations = this.annotations.filter(function(el){
            return el.id !== this.el.id;
        },{el:annotation});
        console.log('annotations after',this.annotations);
    }

    addAnnotation({annotation}){
        console.log('annotationsStore add',annotation);
        this.annotations.push(annotation);
    }


}

export default alt.createStore(AnnotationsStore,storeID);