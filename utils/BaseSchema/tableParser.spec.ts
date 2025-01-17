import {TableParser} from './tableParser';
import {describe, expect, it} from 'vitest';
import {TableProps} from './table';


const tableInfo: TableProps = {
    name: 'SentimentResponse',
    fields: [{
        id: 'fld8t4vEEN',
        type: 1,
        name: 'content',
        property: {},
    },
        {
            id: 'fld1g8LMRX',
            type: 3,
            name: 'sentiment',
            property: {
                options: [{
                    id: 'optdhSv28L',
                    name: 'negative',
                    color: 0,
                },
                    {
                        id: 'opt7HpQCOH',
                        color: 1,
                        name: 'neutral',
                    },
                    {
                        id: 'opt3UsIu8H',
                        color: 2,
                        name: 'positive',
                    }],
            },
        },
    ],
};

describe('BaseSchema class init', () => {

    const core = new TableParser(tableInfo);
    it('get table title', () => {
        expect(core.title).toBe('SentimentResponse');
    });
    it('should get fields names', function () {
        expect(core.fieldNames).toEqual(['content', 'sentiment']);
    });

});


describe('BaseSchema class format', () => {
    const core = new TableParser(tableInfo);

    it('should format string field', function () {
        expect(core.formatStringField(tableInfo.fields[0])).toBe('content: string;');
    });

    it('should format select field', function () {
        expect(core.formatSelectField(tableInfo.fields[1])).toBe(`sentiment: "negative" | "neutral" | "positive";`);
    });

    it('should format field', function () {
        expect(core.formatField(tableInfo.fields[0])).toBe('content: string;');
        expect(core.formatField(tableInfo.fields[1])).toBe(`sentiment: "negative" | "neutral" | "positive";`);
    });

    it('should format title', function () {
        expect(core.formatTitle()).toBe('export interface SentimentResponse {');
    });

    it('should format end', function () {
        expect(core.formatEnd()).toBe('}');
    });

    it('should format all', function () {
        expect(core.typeStr).toBe(`export interface SentimentResponse {
content: string;
sentiment: "negative" | "neutral" | "positive";
}`);
    });
});
