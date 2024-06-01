import { LightningElement, wire, track } from 'lwc';
import getEntity from '@salesforce/apex/EYGetEntity.getEntityRecords';
import getFieldforSelectedObject from '@salesforce/apex/EYGetEntity.getFields';
import getFieldforSelectedObjectCriteria from '@salesforce/apex/EYGetEntity.getRecordsforSelectedCriteria';
import getRecordsforSelectedObject from '@salesforce/apex/EYGetEntity.getRecordsforSelectedObject';
import getRecordsOnSelectedFields from '@salesforce/apex/EYGetEntity.getRecordsOnSelectedFields';


export default class Entityworkout extends LightningElement {
   
   @track sobjectList;
   @track selectedObject='';
   @track selectedField='';
   @track fieldList;
   @track fieldListMap;
   @track recordsList;
   @track selectedFieldsApex;
   columns = [    //{ label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'CreatedById', fieldName: 'CreatedById'},];

    @wire(getEntity)
    getAllEntity({ data, error }){
    if (data) {
        this.sobjectList=this.organize(data);
        this.error = undefined;
    } else if (error) {
        this.error = error;
        console.log(error);
    }
   }

    organize(sobjectsMap) {
        this.organizedList=[];
        for(let key in sobjectsMap){
            this.organizedList.push({label: key, value: key});
        }
        return this.organizedList;
    }
   
    handleChange(event) {
       this.selectedObject=event.detail.value;

       getFieldforSelectedObject({strobjectName : this.selectedObject})
            .then(result => {
                this.fieldList = result;
                this.fieldListMap = this.organize(this.fieldList);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
        console.log(this.fieldList);
        }

        handleChangeFields(event){

            console.log(this.selectedObject);
            this.selectedField = event.detail.value; 
            console.log(this.selectedField);

            getFieldforSelectedObjectCriteria({strobjectName : this.selectedObject, strfieldName : this.selectedField})
            .then(result => {
                console.log('query done ----> ');
                console.log(result);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
            
        }


        getRecordsForEntity(event){
            //to get the records of the selected entity
            getRecordsforSelectedObject({strobjectName : this.selectedObject})
            .then(result => {
                this.recordsList = result;
                console.log('recordList---> '+ this.recordsList);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });

        }



        handleChangeDualCombo(event){
            this.selectedFieldsApex= event.detail.value.join(', ')
        }

        getRecordsOnSelectedFields(event)
        {           
            //this.selectedFieldsApex = event.detail.value(0);
            console.log('getRecordsOnSelectedFields' + this.selectedFieldsApex )  ;
            //to get the records of the selected entity
            getRecordsOnSelectedFields({strobjectName : this.selectedObject, strFieldsSelected :this.selectedFieldsApex })
            .then(result => {
                this.recordsList = result;
                console.log('recordList---> '+ this.recordsList);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
        }
}