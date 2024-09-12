import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import * as samples from '../samples';
import HeaderViewer from './HeaderViewer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/HeaderViewer',
  component: HeaderViewer,
} as ComponentMeta<typeof HeaderViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderViewer> = (args) => <div style={{paddingLeft: '250px'}}><HeaderViewer {...args} /></div>;

export const MITID_CITIZEN = Template.bind({});
MITID_CITIZEN.storyName = 'MitID / Citizen';
MITID_CITIZEN.args = {
  header: samples.MITID_CITIZEN.header
};