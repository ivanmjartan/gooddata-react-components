// (C) 2007-2018 GoodData Corporation
import pick = require('lodash/pick');
import set = require('lodash/set');
import get = require('lodash/get');
import { RIGHT, PositionType } from './PositionTypes';
import * as Highcharts from 'highcharts';
import {
    isAreaChart,
    isScatterPlot,
    isOneOfTypes,
    isHeatmap,
    isTreemap,
    isBubbleChart
} from '../../utils/common';
import { VisualizationTypes } from '../../../../constants/visualizationTypes';

export interface ILegendOptions {
   enabled: boolean;
   position: PositionType;
   format: string;
   items: LegendOptionsItemType[];
}

export type LegendOptionsItemType = ILegendBaseItem | ILegendHeatMapItem;

export interface ILegendBaseItem {
    name: string;
    color: string; // in format rgb(20,178,226)
    legendIndex: number;
}

export interface ILegendHeatMapItem {
    range: IRange;
    color: string | Highcharts.Gradient;
    legendIndex: number;
}

export interface IRange {
    from: number;
    to: number;
}

export const DEFAULT_LEGEND_CONFIG = {
    enabled: true,
    position: RIGHT
};

function isHeatmapWithMultipleValues(chartOptions: any) {
    const { type } = chartOptions;
    const dataClasses: Highcharts.ColorAxisDataClass[] = get(chartOptions, 'colorAxis.dataClasses', []);

    return isHeatmap(type) && dataClasses.length > 1;
}

export function shouldLegendBeEnabled(chartOptions: any) {
    const seriesLength = get(chartOptions, 'data.series.length');
    const { type, stacking, hasStackByAttribute, hasViewByAttribute } = chartOptions;
    // More than one measure or stackedBy more than one category
    const hasMoreThanOneSeries = seriesLength > 1;
    const isAreaChartWithOneSerie = isAreaChart(type) && !hasMoreThanOneSeries && !hasStackByAttribute;
    const isStacked = !isAreaChartWithOneSerie && !isTreemap(type) && Boolean(stacking);
    const sliceTypes = [VisualizationTypes.PIE, VisualizationTypes.DONUT];
    const isSliceChartWithViewByAttributeOrMultipleMeasures =
        isOneOfTypes(type, sliceTypes) && (hasViewByAttribute || chartOptions.data.series[0].data.length > 1);
    const isBubbleWithViewByAttribute = isBubbleChart(type) && hasViewByAttribute;
    const isScatterPlotWithAttribute = isScatterPlot(type) && chartOptions.data.series[0].name;
    const isTreemapWithViewByAttribute = isTreemap(type) && hasViewByAttribute;
    const isTreemapWithManyCategories = isTreemap(type) && chartOptions.data.categories.length > 1;

    return hasMoreThanOneSeries
        || isSliceChartWithViewByAttributeOrMultipleMeasures
        || isStacked
        || isScatterPlotWithAttribute
        || isTreemapWithViewByAttribute
        || isBubbleWithViewByAttribute
        || isTreemapWithManyCategories
        || isHeatmapWithMultipleValues(chartOptions);
}

export function getLegendItems(chartOptions: any): LegendOptionsItemType[] {
    const { type } = chartOptions;
    const firstSeriesDataTypes = [
        VisualizationTypes.PIE,
        VisualizationTypes.DONUT,
        VisualizationTypes.TREEMAP,
        VisualizationTypes.FUNNEL,
        VisualizationTypes.SCATTER
    ];

    if (isHeatmap(type)) {
        const dataClasses: Highcharts.ColorAxisDataClass[] = get(chartOptions, 'colorAxis.dataClasses', []);
        return dataClasses.map((dataClass, index) => {
            const { from, to, color } = dataClass;
            const range = {
                from,
                to
            };

            return {
                range,
                color,
                legendIndex: index
            };
        });
    }

    const legendDataSource = isOneOfTypes(type, firstSeriesDataTypes)
        ? chartOptions.data.series[0].data
        : chartOptions.data.series;

    return legendDataSource
        .filter((legendDataSourceItem: any) =>
            legendDataSourceItem.showInLegend !== false)
        .map((legendDataSourceItem: any) =>
            pick(legendDataSourceItem, ['name', 'color', 'legendIndex']));
}

export default function getLegend(legendConfig: any = {}, chartOptions: any): ILegendOptions {
    const defaultLegendConfigByType = {};
    const rightLegendCharts = [VisualizationTypes.SCATTER, VisualizationTypes.TREEMAP, VisualizationTypes.BUBBLE];

    if (legendConfig.position === 'auto' || !legendConfig.position) {
        if (isOneOfTypes(chartOptions.type, rightLegendCharts)) {
            set(defaultLegendConfigByType, 'position', 'right');
        } else if (isHeatmap(chartOptions.type)) {
            set(defaultLegendConfigByType, 'position', 'top');
        }
    }

    const baseConfig = {
        ...DEFAULT_LEGEND_CONFIG,
        ...legendConfig,
        ...defaultLegendConfigByType // TODO: swipe these two lines once default legend logic is moved to the sdk
    };

    return {
        ...baseConfig,
        enabled: baseConfig.enabled && shouldLegendBeEnabled(chartOptions),
        format: get(chartOptions, 'title.format', ''),
        items: getLegendItems(chartOptions)
    };
}
