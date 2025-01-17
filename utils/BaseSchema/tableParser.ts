import {IBaseFieldMeta} from '@base-open/web-api';
import {TableProps} from './table';


export class TableParser {
    table: TableProps;
    constructor(tableInfo: TableProps) {
        this.table = tableInfo;
    }

    get title() {
        return this.table.name;
    }


    get fieldNames() {
        return this.table.fields.map(f => f.name);
    }

    formatStringField(field: IBaseFieldMeta) {
        return `${field.name}: string;`;
    }
    formatSelectField(field: IBaseFieldMeta) {
        const property = field.property as any
        if (!property || !property?.options) {{
            return '';}
        }
        const options = property.options as any
        if (!options) {
            return '';
        }
        const optionsStr = options.map((o: any) => `"${o.name}"`).join(' | ');
        return `${field.name}: ${optionsStr};`;
    }
    formatField(field: IBaseFieldMeta) {
        switch (field.type) {
            case 1:
                return this.formatStringField(field);
            case 3:
                return this.formatSelectField(field);
            default:
                return '';
        }
    }

    formatTitle() {
        return `export interface ${this.title} {`;
    }

    formatEnd() {
        return `}`;
    }

    private formatAll(){
        const fields = this.table.fields.map(f => this.formatField(f)).join('\n');
        return `${this.formatTitle()}\n${fields}\n${this.formatEnd()}`;
    }

    get typeStr(){
        return this.formatAll()
    }



}
