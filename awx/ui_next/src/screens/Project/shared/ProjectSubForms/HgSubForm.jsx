import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import {
  UrlFormField,
  BranchFormField,
  ScmCredentialFormField,
  ScmTypeOptions,
} from './SharedFields';

const HgSubForm = ({
  i18n,
  scmCredential,
  setScmCredential,
  scmUpdateOnLaunch,
}) => (
  <>
    <UrlFormField
      i18n={i18n}
      tooltip={
        <span>
          {i18n._(t`Example URLs for Mercurial SCM include:`)}
          <ul style={{ margin: '10px 0 10px 20px' }}>
            <li>https://bitbucket.org/username/project</li>
            <li>ssh://hg@bitbucket.org/username/project</li>
            <li>ssh://server.example.com/path</li>
          </ul>
          {i18n._(t`Note: Mercurial does not support password authentication
        for SSH. Do not put the username and key in the URL. If using
        Bitbucket and SSH, do not supply your Bitbucket username.
        `)}
        </span>
      }
    />
    <BranchFormField i18n={i18n} label={i18n._(t`SCM Branch/Tag/Revision`)} />
    <ScmCredentialFormField
      setScmCredential={setScmCredential}
      scmCredential={scmCredential}
    />
    <ScmTypeOptions scmUpdateOnLaunch={scmUpdateOnLaunch} />
  </>
);

export default withI18n()(HgSubForm);
