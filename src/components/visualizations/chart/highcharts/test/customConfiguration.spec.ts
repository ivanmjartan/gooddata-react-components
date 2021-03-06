// (C) 2007-2018 GoodData Corporation
import { getCustomizedConfiguration } from '../customConfiguration';
import { VisualizationTypes } from '../../../../../constants/visualizationTypes';
import { immutableSet } from '../../../utils/common';

const chartOptions = {
    type: VisualizationTypes.LINE,
    yAxes: [{ title: 'atitle' }],
    xAxes: [{ title: 'xtitle' }],
    data: {
        series: [
            {
                color: 'rgb(0, 0, 0)',
                name: '<b>aaa</b>',
                data: [
                    {
                        name: '<b>bbb</b>'
                    },
                    null
                ]
            }
        ]
    }
};

describe('getCustomizedConfiguration', () => {
    it('should escape series names', () => {
        const result = getCustomizedConfiguration(chartOptions);
        expect(result.series[0].name).toEqual('&lt;b&gt;aaa&lt;/b&gt;');
    });

    it('should escape data items in series', () => {
        const result = getCustomizedConfiguration(chartOptions);
        expect(result.series[0].data[0].name).toEqual('&lt;b&gt;bbb&lt;/b&gt;');
    });

    it('should set gridline width to zero', () => {
        const result = getCustomizedConfiguration({ ...chartOptions, grid: { enabled: false } });
        expect(result.yAxis[0].gridLineWidth).toEqual(0);
    });

    it('should handle "%" format on axis and use lable formater', () => {
        const chartOptionsWithFormat = immutableSet(chartOptions, 'yAxes[0].format', '0.00 %');
        const resultWithoutFormat = getCustomizedConfiguration(chartOptions);
        const resultWithFormat = getCustomizedConfiguration(chartOptionsWithFormat);

        expect(resultWithoutFormat.yAxis[0].labels.formatter).toBeUndefined();
        expect(resultWithFormat.yAxis[0].labels.formatter).toBeDefined();
    });

    it('should set Y axis configuration from properties', () => {
        const result = getCustomizedConfiguration({
                ...chartOptions,
                yAxisProps: {
                    min: 20,
                    max: 30,
                    labelsEnabled: false,
                    visible: false
                }
            });

        const expectedResult = {
            ...result.yAxis[0],
            min: 20,
            max: 30,
            labels: {
                ...result.yAxis[0].labels,
                enabled: false
            },
            visible: false
        };

        expect(result.yAxis[0]).toEqual(expectedResult);
    });

    it('should set Y axis of bar chart by properties for X axis', () => {
        const result = getCustomizedConfiguration({
            ...chartOptions,
            type: VisualizationTypes.BAR,
            xAxisProps: {
                min: 20,
                max: 30,
                labelsEnabled: false,
                visible: false
            }
        });

        const expectedResult = {
            ...result.yAxis[0],
            min: 20,
            max: 30,
            labels: {
                ...result.yAxis[0].labels,
                enabled: false
            },
            visible: false
        };

        expect(result.yAxis[0]).toEqual(expectedResult);
    });

    it ('should set X axis visibility from properties', () => {
        const result = getCustomizedConfiguration({
            ...chartOptions,
            xAxisProps: {
                visible: false
            }
        });

        const expectedResult = {
            ...result.xAxis[0],
            visible: false
        };

        expect(result.xAxis[0]).toEqual(expectedResult);
    });

    it ('should set X axis visibility for bar chart from Y-axis properties', () => {
        const result = getCustomizedConfiguration({
            ...chartOptions,
            type: VisualizationTypes.BAR,
            yAxisProps: {
                visible: false
            }
        });

        const expectedResult = {
            ...result.xAxis[0],
            visible: false
        };

        expect(result.xAxis[0]).toEqual(expectedResult);
    });

    it ('should set startOnTick on true when min or max is not defined', () => {
        const result = getCustomizedConfiguration(chartOptions);

        expect(result.yAxis[0].startOnTick).toBeTruthy();
    });

    it ('should set startOnTick on false when min is bigger than 0 and max is not defined', () => {
        const result = getCustomizedConfiguration({
            ...chartOptions,
            yAxisProps: {
                min: 50
            }
        });

        expect(result.yAxis[0].startOnTick).toBeFalsy();
    });

    it ('should set endOnTick on true when min or max is not defined', () => {
        const result = getCustomizedConfiguration(chartOptions);

        expect(result.yAxis[0].endOnTick).toBeTruthy();
    });

    it ('should set endOnTick on false when max is bigger than 0 and min is not defined', () => {
        const result = getCustomizedConfiguration({
            ...chartOptions,
            yAxisProps: {
                max: 50
            }
        });

        expect(result.yAxis[0].endOnTick).toBeFalsy();
    });
});
