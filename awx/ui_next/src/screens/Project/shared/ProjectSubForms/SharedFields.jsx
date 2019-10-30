import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Field } from 'formik';
import CredentialLookup from '@components/Lookup/CredentialLookup';
import FormField, { CheckboxField } from '@components/FormField';
import { required } from '@util/validators';
import FormRow from '@components/FormRow';
import { FormGroup, Title } from '@patternfly/react-core';
import styled from 'styled-components';

export const SubFormTitle = styled(Title)`
  --pf-c-title--m-md--FontWeight: 700;
  grid-column: 1 / -1;
`;

export const UrlFormField = withI18n()(({ i18n, tooltip }) => (
  <FormField
    id="project-scm-url"
    isRequired
    label={i18n._(t`SCM URL`)}
    name="scm_url"
    tooltip={tooltip}
    tooltipMaxWidth="350px"
    type="text"
    validate={required(null, i18n)}
  />
));

export const BranchFormField = withI18n()(({ i18n, label }) => (
  <FormField
    id="project-scm-branch"
    name="scm_branch"
    type="text"
    label={label}
    tooltip={i18n._(t`Branch to checkout. In addition to branches,
        you can input tags, commit hashes, and arbitrary refs. Some
        commit hashes and refs may not be availble unless you also
        provide a custom refspec.`)}
  />
));

export const ScmCredentialFormField = withI18n()(
  ({ i18n, setScmCredential, scmCredential }) => (
    <Field
      name="credential"
      render={({ form }) => (
        <CredentialLookup
          credentialTypeId={scmCredential.typeId}
          label={i18n._(t`SCM Credential`)}
          value={scmCredential.value}
          onChange={credential => {
            form.setFieldValue('credential', credential.id);
            setScmCredential({
              ...scmCredential,
              value: credential,
            });
          }}
        />
      )}
    />
  )
);

/*
  PF Bug: FormGroup doesn't pass down className
  Workaround is to wrap FormGroup with an extra div
  Cleanup when upgraded to @patternfly/react-core@3.103.4
*/
export const ScmTypeOptions = withI18n()(
  ({ i18n, scmUpdateOnLaunch, hideAllowOverride }) => (
    <>
      <div css="grid-column: 1/-1">
        <FormGroup
          fieldId="project-option-checkboxes"
          label={i18n._(t`Options`)}
        >
          <FormRow>
            <CheckboxField
              id="option-scm-clean"
              name="scm_clean"
              label={i18n._(t`Clean`)}
              tooltip={i18n._(
                t`Remove any local modifications prior to performing an update.`
              )}
            />
            <CheckboxField
              id="option-scm-delete-on-update"
              name="scm_delete_on_update"
              label={i18n._(t`Delete`)}
              tooltip={i18n._(
                t`Delete the local repository in its entirety prior to
                  performing an update. Depending on the size of the
                  repository this may significantly increase the amount
                  of time required to complete an update.`
              )}
            />
            <CheckboxField
              id="option-scm-update-on-launch"
              name="scm_update_on_launch"
              label={i18n._(t`Update Revision on Launch`)}
              tooltip={i18n._(
                t`Each time a job runs using this project, update the
                  revision of the project prior to starting the job.`
              )}
            />
            {!hideAllowOverride && (
              <CheckboxField
                id="option-allow-override"
                name="allow_override"
                label={i18n._(t`Allow Branch Override`)}
                tooltip={i18n._(
                  t`Allow changing the SCM branch or revision in a job
                    template that uses this project.`
                )}
              />
            )}
          </FormRow>
        </FormGroup>
      </div>
      {scmUpdateOnLaunch && (
        <>
          <SubFormTitle size="md">{i18n._(t`Option Details`)}</SubFormTitle>
          <FormField
            id="project-cache-timeout"
            name="scm_update_cache_timeout"
            type="number"
            min="0"
            label={i18n._(t`Cache Timeout`)}
            tooltip={i18n._(t`Time in seconds to consider a project
                    to be current. During job runs and callbacks the task
                    system will evaluate the timestamp of the latest project
                    update. If it is older than Cache Timeout, it is not
                    considered current, and a new project update will be
                    performed.`)}
          />
        </>
      )}
    </>
  )
);
