import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import * as samples from '../samples';
import EncodedViewer from './EncodedViewer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/EncodedViewer',
  component: EncodedViewer,
} as ComponentMeta<typeof EncodedViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EncodedViewer> = (args) => <div style={{paddingLeft: '0px'}}><EncodedViewer {...args} /></div>;

export const MITID_CITIZEN = Template.bind({});
MITID_CITIZEN.storyName = 'MitID / Citizen';
MITID_CITIZEN.args = {
  jwt: samples.MITID_CITIZEN.jwt
};