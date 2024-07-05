import { EntitySchema } from "typeorm";
export const CitySchema = new EntitySchema({
  name: "City",
  tableName: "cities",
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
    country_id: {
      type: "int",
      nullable: false,
    },
    is_active: {
      type: "boolean",
      nullable: false,
    },
    lat: {
      type: "double precision",
      nullable: false,
    },
    long: {
      type: "double precision",
      nullable: false,
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
//   relations: {
//     country: {
//       type: "many-to-one",
//       target: "Country",
//       joinColumn: {
//           name: "country_id",
//           referencedColumnName: "id",
//       },
//   },
// },
 
});
