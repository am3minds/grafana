import * as $ from 'jquery';
import React, { useState, useCallback } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from 'emotion';
import {
  stylesFactory,
  useTheme,
  LegacyForms,
  Form,
  Select,
  Field,
  Button,
  Input,
  Checkbox,
  TagsInput,
} from '@grafana/ui';
import { MrsFormModel } from './types';

const { FormField } = LegacyForms;

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  const [parameters, setParameters] = useState<any>({});
  const [value, setValue] = useState<string>();

  let defaultVal = [];

  let defoptions = [];

  let defaultFormValues: any;

  $.ajax({
    url: 'http://18.196.9.177:3004/search',
    dataType: 'jsonp',
    success: function(response) {
      console.log(response);
      defaultVal = response;
      defaultVal.forEach(v => {
        defoptions.push({
          label: v.name,
          value: v.name,
        });
      });
    },
  });

  const handleSubmit = async (formData: MrsFormModel) => {
    event.preventDefault();
    console.log('submit');
    console.log(formData);
    $.ajax({
      url: 'http://18.196.9.177:3004/parameters/update' + '?parameters=' + btoa(JSON.stringify(formData)),
      dataType: 'jsonp',
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.log(error);
      },
    });
  };

  const changedDefault = (v: any) => {
    const dffound = defaultVal.find(dv => dv.name === v.label);
    defaultFormValues = {
      name: v.label,
    };
    console.log(defaultFormValues);
  };

  const typeValue = [
    {
      label: 'Float',
      value: 'float',
    },
    {
      label: 'Integrer',
      value: 'integer',
    },
    {
      label: 'MultiClass',
      value: 'muticlass',
    },
    {
      label: 'Binary',
      value: 'binary',
    },
    {
      label: 'String',
      value: 'string',
    },
  ];

  return (
    <Form defaultValues={defaultFormValues} onSubmit={handleSubmit} className="gf-form-query-content">
      {({ register, errors }) => {
        return (
          <>
            <div className="gf-form">
              <Select
                options={defoptions}
                onChange={v => {
                  setValue(v.value);
                  changedDefault(v);
                }}
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="Name"
                tooltip="Enter Name."
                description="This information is very important, so you really need to fill it in"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="name"
                      className="gf-form-input width-10"
                      required
                      ref={register({
                        required: 'Name is required',
                      })}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={0}
                label="Description"
                inputEl={
                  <>
                    <input type="text" name="description" className="gf-form-input width-30" ref={register} />
                  </>
                }
                tooltip="Enter Description."
              />
              <FormField
                labelWidth={10}
                label="Type"
                inputEl={
                  <>
                    <Select
                      options={typeValue}
                      ref={register}
                      name="type"
                      className="width-10"
                      onChange={v => {
                        setValue(v.value);
                      }}
                    />
                  </>
                }
                tooltip="Enter type."
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="Unit"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="unit"
                      className="gf-form-input width-10"
                      ref={register({
                        required: 'This is not a valid value',
                      })}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="Tags"
                inputEl={
                  <>
                    <TagsInput
                      ref={register}
                      name="tags"
                      tags={[]}
                      onChange={v => {
                        setValue(v.value);
                      }}
                    />
                  </>
                }
                tooltip="Enter Tags."
              />
              <FormField
                labelWidth={10}
                inputWidth={0}
                inputEl={
                  <>
                    <input
                      type="text"
                      name="limits.sanity.min"
                      className="gf-form-input width-10"
                      pattern="[0-9]"
                      ref={register}
                    />
                  </>
                }
                label="limits.sanity.min"
                tooltip="Enter Description."
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="limits.sanity.max"
                tooltip="Enter type."
                inputEl={
                  <>
                    <input
                      type="text"
                      name="limits.sanity.max"
                      className="gf-form-input width-10"
                      ref={register}
                      pattern="[0-9]"
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="limits.sanity.action"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="limits.sanity.action"
                      className="gf-form-input width-10"
                      ref={register}
                      pattern="[0-9]"
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="limits.permissible.min"
                tooltip="Enter Description."
                inputEl={
                  <>
                    <input
                      type="text"
                      name="limits.permissible.min"
                      className="gf-form-input width-10"
                      ref={register}
                    />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="limits.permissible.max"
                tooltip="Enter type."
                inputEl={
                  <>
                    <input
                      type="text"
                      name="limits.permissible.max"
                      className="gf-form-input width-10"
                      ref={register}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="classes"
                inputEl={
                  <>
                    <input type="text" name="classes" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="is_virtual"
                inputEl={
                  <>
                    <Checkbox name="is_virtual" ref={register} />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                inputWidth={0}
                label="query"
                inputEl={
                  <>
                    <input type="text" name="query" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="expression"
                tooltip="Enter type."
                inputEl={
                  <>
                    <input type="text" name="expression" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="simulate"
                inputEl={
                  <>
                    <Checkbox name="simulate" ref={register} />
                  </>
                }
              />
            </div>
            <br />
            <p>Simulation</p>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="Bucket"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.bucket"
                      className="gf-form-input width-10"
                      required
                      ref={register({
                        required: 'Bucket is required',
                      })}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="Historical"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.historical"
                      className="gf-form-input width-10"
                      required
                      ref={register({
                        required: 'Historical is required',
                      })}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="Forecast"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.forecast"
                      className="gf-form-input width-10"
                      required
                      ref={register({
                        required: 'Forecast is required',
                      })}
                    />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="features"
                inputEl={
                  <>
                    <input type="text" name="simulation.features" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.distribution"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.data.distribution"
                      className="gf-form-input width-10"
                      ref={register}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.mean"
                inputEl={
                  <>
                    <input type="text" name="simulation.data.mean" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="data.conf"
                inputEl={
                  <>
                    <input type="text" name="simulation.data.conf" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.delta"
                inputEl={
                  <>
                    <input type="text" name="simulation.data.delta" className="gf-form-input width-10" ref={register} />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.trend.multiplicative"
                inputEl={
                  <>
                    <Checkbox name="data.trend.multiplicative" ref={register} />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="data.trend.expression"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.data.trend.expression"
                      className="gf-form-input width-30"
                      ref={register}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={15}
                label="data.seasonality.multiplicative"
                inputEl={
                  <>
                    <Checkbox name="data.seasonality.multiplicative" ref={register} />
                  </>
                }
              />
            </div>
            <div className="gf-form">
              <FormField
                labelWidth={10}
                label="data.seasonality.periods"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.data.seasonality.periods"
                      className="gf-form-input width-10"
                      ref={register}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.seasonality.expression"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.data.seasonality.expression"
                      className="gf-form-input width-30"
                      ref={register}
                    />
                  </>
                }
              />
              <FormField
                labelWidth={10}
                label="data.seasonality.distribution"
                inputEl={
                  <>
                    <input
                      type="text"
                      name="simulation.data.seasonality.distribution"
                      className="gf-form-input width-10"
                      ref={register}
                    />
                  </>
                }
              />
            </div>
            <br />
            <Button type="submit" value="Save">
              Save
            </Button>

            <Button value="Delete" className="red">
              Delete
            </Button>
          </>
        );
      }}
    </Form>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
