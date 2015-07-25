import alt from '../../../../../alt';
import Actions from './AnnotationActions';

let storeID = 'AnnotationsStore';

class AnnotationsStore {

    constructor() {
        console.log('Actions',Actions);
        this.bindActions(Actions);
        this.annotations = [];
    }

    loadAnnotations(annotations){
        console.log('annotationsStore loadAnnotations',annotations);
        this.annotations = annotations;

    }

}

export default alt.createStore(AnnotationsStore,storeID);