import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import * as samples from '../samples';
import PayloadViewer from './PayloadViewer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PayloadViewer',
  component: PayloadViewer,
} as ComponentMeta<typeof PayloadViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PayloadViewer> = (args) => <div style={{paddingLeft: '250px'}}><PayloadViewer {...args} /></div>;

export const MITID_CITIZEN = Template.bind({});
MITID_CITIZEN.storyName = 'MitID / Citizen';
MITID_CITIZEN.args = {
  payload: samples.MITID_CITIZEN.payload
};

export const MITID_CITIZEN_ADDRESS = Template.bind({});
MITID_CITIZEN_ADDRESS.storyName = 'MitID / Citizen / With address';
MITID_CITIZEN_ADDRESS.args = {
  payload: samples.MITID_CITIZEN_ADDRESS.payload
};

export const MITID_BUSINESS_SIGNATORY_RISKDATA = Template.bind({});
MITID_BUSINESS_SIGNATORY_RISKDATA.storyName = 'MitID / Business / Signatory with risk data';
MITID_BUSINESS_SIGNATORY_RISKDATA.args = {
  payload: samples.MITID_BUSINESS_SIGNATORY_RISKDATA.payload
};

export const NEMID_POCES = Template.bind({});
NEMID_POCES.storyName = 'NemID / POCES';
NEMID_POCES.args = {
  payload: samples.NEMID_POCES.payload
};

export const SEBANKID = Template.bind({});
SEBANKID.storyName = 'SE BankID';
SEBANKID.args = {
  payload: samples.SEBANKID.payload
};

export const NOBANKID = Template.bind({});
NOBANKID.storyName = 'NO BankID';
NOBANKID.args = {
  payload: samples.NOBANKID.payload
};

export const NOBANKID_SSN = Template.bind({});
NOBANKID_SSN.storyName = 'NO BankID with SSN';
NOBANKID_SSN.args = {
  payload: samples.NOBANKID_SSN.payload
};

export const NOBANKID_ADDRESS = Template.bind({});
NOBANKID_ADDRESS.storyName = 'NO BankID with address';
NOBANKID_ADDRESS.args = {
  payload: samples.NOBANKID_ADDRESS.payload
};

export const FTN_BANKID = Template.bind({});
FTN_BANKID.storyName = 'FTN BankID';
FTN_BANKID.args = {
  payload: samples.FTN_BANKID.payload
};