public with sharing class EYGetEntity {

    private static Map<String, Schema.SObjectType> sobjects = Schema.getGlobalDescribe();

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getEntityRecords()
    {        
        Map<String, String> allObjects = new Map<String,String>();
        for(Schema.SObjectType  obj : sobjects.values()){
            String name = obj.getDescribe().getLocalName();
            String label = obj.getDescribe().getLabel();
            allObjects.put(name,label);
        }
        return allObjects;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getFields(String strobjectName)
    {   Map<String,String> fieldDetails = new Map<String,String>();
        System.debug('big values'+sobjects.get(strobjectName).getDescribe().fields.getMap());

       // List<Schema.SObjectTypeFields> fieldsDetails = sobjects.get(objectName).getDescribe().fields.getMap().getValues();
        for(Schema.SObjectField field : sobjects.get(strobjectName).getDescribe().fields.getMap().Values()) {
            String name = field.getDescribe().getLocalName();
            String label = name;
            fieldDetails.put(name,label);
        } 
        System.debug('fieldetails' +fieldDetails);       
        return fieldDetails;
    }


    @AuraEnabled(cacheable=true)
    public static List<Sobject> getRecordsforSelectedCriteria(String strobjectName, String strfieldName){
        System.debug(strobjectName + ' ' + strfieldName);
        String query =  'SELECT ' + strfieldName + ' FROM ' + strobjectName + ' LIMIT 1';
        List<SObject> records = Database.query(query);
        return records;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecordsforSelectedObject(String strobjectName)
    {
        String query = 'Select Id, Name, CreatedById From ' + strobjectName;
        List<SObject> records = Database.query(query);
        return records;
    }
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecordsOnSelectedFields(String strobjectName, String strFieldsSelected){
        String query = 'Select '+ strFieldsSelected + ' From ' + strobjectName;
        System.debug(query);
        List<SObject> records = Database.query(query);
        System.debug(records);
        return records;
    }

}