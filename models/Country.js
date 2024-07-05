
import { EntitySchema } from "typeorm";
export const CountrySchema = new EntitySchema({
  name: "Country",
  tableName: "countries",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: false,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    alt_name:{
        type:'varchar',
        nullable:true
    },
    country_code_two: {
      type: "varchar",
      nullable: false,
    },
    country_code_three: {
      type: "varchar",
      nullable: false,
    },
    flag_app:{
        type:'varchar',
        nullable:false
    },
    mobile_code: {
      type: "varchar",
      nullable: false,
    },
    continent_id: {
      type: "int",
      nullable: false,
    },
    country_flag:{
        type:'varchar',
        nullable:false
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  

});
