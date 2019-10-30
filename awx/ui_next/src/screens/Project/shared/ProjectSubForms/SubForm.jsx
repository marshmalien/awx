import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import styled from 'styled-components';
import FormRow from '@components/FormRow';
import {
  GitSubForm,
  HgSubForm,
  SvnSubForm,
  InsightsSubForm,
  SubFormTitle,
} from '.';

const ScmTypeFormRow = styled(FormRow)`
  background-color: #f5f5f5;
  grid-column: 1 / -1;
  margin: 0 -24px;
  padding: 24px;
`;

const SubForm = ({ i18n, type, ...props }) => (
  <ScmTypeFormRow>
    <SubFormTitle size="md">{i18n._(t`Type Details`)}</SubFormTitle>
    {
      {
        git: <GitSubForm {...props} />,
        hg: <HgSubForm {...props} />,
        svn: <SvnSubForm {...props} />,
        insights: <InsightsSubForm {...props} />,
      }[type]
    }
  </ScmTypeFormRow>
);

export default withI18n()(SubForm);
