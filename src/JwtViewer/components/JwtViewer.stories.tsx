import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import * as samples from '../samples';
import JwtViewer from './JwtViewer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/JwtViewer',
  component: JwtViewer,
} as ComponentMeta<typeof JwtViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JwtViewer> = (args) => <JwtViewer {...args} />;


export const Empty = Template.bind({});
Empty.storyName = 'Empty';

export const MITID_BUSINESS_SIGNATORY_RISKDATA = Template.bind({});
MITID_BUSINESS_SIGNATORY_RISKDATA.storyName = 'MitID / Business / Signatory with risk data';
MITID_BUSINESS_SIGNATORY_RISKDATA.args = {
  jwt: samples.MITID_BUSINESS_SIGNATORY_RISKDATA.jwt
};

export const NOBANKID = Template.bind({});
NOBANKID.storyName = 'NO BankID';
NOBANKID.args = {
  jwt: samples.NOBANKID.jwt
};