import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles, useTheme } from '@mui/styles';
import React, { CSSProperties, useEffect, useState } from 'react';
import Select, { createFilter, components, SingleValueProps } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';
import { ValueType } from 'react-select/src/types';
import { OptionType } from './widgetsInterfaces';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        input: {
            display: 'flex',
            padding: 0,
            height: 'auto',
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden',
        },

        noOptionsMessage: {
            // padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            bottom: 6,
            fontSize: 16,
        },

    }),
);

const { Option, SingleValue } = components;


interface AutoCompleteProps {
    placeHolder: string,
    label: string,
    error?: string,
    isLoading?: boolean
    onChange: Function,
    options: OptionType[],
    value: ValueType<OptionType>
    icon?: any,
    renderOption?: any,
    renderValueHolder?: any,
    showCustomView?: boolean,
    defaultValue?: ValueType<OptionType>,
    isDisabled?: boolean

}

export default function AutoComplete(props: AutoCompleteProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [options, setOptions] = useState<OptionType[]>([]);
    useEffect(() => {
        if (props.options && props.options.length <= 10) {
            setOptions(props.options)
        } else if (props.options && props.options.length > 10) {
            setOptions(props.options.slice(0, 10))
        }
    }, [setOptions, props.options])


    function handleChangeSingle(value: ValueType<OptionType>) {
        props.onChange(value);
    }

    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            '& input': {
                font: 'inherit',
            },
        }),
    };


    const customOption: any = (optionProps: OptionProps<OptionType>) => {
        return (
            <Option {...optionProps}>
                {/* {(props.showCustomView && props.renderOption && props.renderOption(optionProps.data)) || optionProps.data.label} */}
            </Option>
        );
    }


    const customSingleValue: any = (valueProps: SingleValueProps<OptionType>) => {
        return (
            <SingleValue {...valueProps}>
                {/* {(props.showCustomView && props.renderValueHolder && props.renderValueHolder(valueProps)) || valueProps.children} */}
            </SingleValue>
        );
    }


    return (
        <div className={classes.root}>
            <label htmlFor="">{props.label}</label>
            <Select
                classes={classes}
                // styles={selectStyles}
                inputId="react-select"
                classNamePrefix="select"
                filterOption={
                    createFilter({
                        ignoreAccents: false,
                        ignoreCase: true,
                    })
                }
                ignoreAccents={false}
                isLoading={props.isLoading}
                isSearchable={true}
                error={props.error || ""}
                /* Remove the currently focused option when the user presses backspace */
                backspaceRemovesValue={true}
                placeholder={props.placeHolder}
                options={options}
                isDisabled={props.isDisabled}
                components={{
                    Option: customOption,
                    SingleValue: customSingleValue
                }}
                defaultValue={props.defaultValue}
                value={props.value}
                onInputChange={(newValue) => {
                    var optionList = props.options && props.options.filter((element: any) => {
                        try {
                            return (element.label).toLocaleLowerCase().includes(newValue.toLocaleLowerCase())
                        } catch (error) {
                            console.log(element);

                            console.log(error);

                            return element
                        }

                    }).slice(0, 10);
                    setOptions(optionList);
                }}
                onChange={handleChangeSingle}
            />
        </div>
    );


}
