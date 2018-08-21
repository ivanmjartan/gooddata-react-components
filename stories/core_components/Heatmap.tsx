import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { screenshotWrap } from '@gooddata/test-storybook';

import { Heatmap } from '../../src/index';
import { onErrorHandler } from '../mocks';
import {
    ATTRIBUTE_1,
    ATTRIBUTE_2,
    MEASURE_1,
    ATTRIBUTE_1_WITH_ALIAS
} from '../data/componentProps';
import { GERMAN_SEPARATORS } from '../data/numberFormat';

const wrapperStyle = { width: 800, height: 400 };

storiesOf('Core components/Heatmap', module)
    .add('metric row column', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('metric only', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('metric and attribute', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('metric row column with row alias', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1_WITH_ALIAS}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('metric row column with cloumn alias', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_2}
                    trendBy={ATTRIBUTE_1_WITH_ALIAS}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('with German number format', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    config={GERMAN_SEPARATORS}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                />
            </div>
        )
    ))
    .add('with disabled legend', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            enabled: false
                        }
                    }}
                />
            </div>
        )
    ))
    .add('with different legend positions', () => (
        screenshotWrap(
            <div style={wrapperStyle}>
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            position: 'auto'
                        }
                    }}
                />
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            position: 'left'
                        }
                    }}
                />
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            position: 'top'
                        }
                    }}
                />
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            position: 'right'
                        }
                    }}
                />
                <Heatmap
                    projectId="storybook"
                    measure={MEASURE_1}
                    segmentBy={ATTRIBUTE_1}
                    trendBy={ATTRIBUTE_2}
                    onError={onErrorHandler}
                    LoadingComponent={null}
                    ErrorComponent={null}
                    config={{
                        legend: {
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        )
    ));
