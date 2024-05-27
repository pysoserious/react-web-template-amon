import { Box, Card, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AutoComplete from '../component/widgets/AutoComplete';
import Button from '../component/widgets/button/Button';
import { CustomToolTip } from '../component/widgets/CustomToolTip';
import EditText from '../component/widgets/EditText';
import { OptionType } from '../component/widgets/widgetsInterfaces';
import { showAlert } from '../redux/actions/AppActions';
import { getUserProfileData } from '../serviceActions/AppServiceActions';
import { dashboardStyles } from './DashboardStyles';
import { DateTimePicker } from '@mui/x-date-pickers';

function DashBoard() {
    const [state, setState] = useState<any>({});
    const classes = dashboardStyles();
    const appDispatch = useDispatch();

    const [value, setValue] = React.useState(null);

    const handleChange = (newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getData = () => {
            // Play with api response
            let response = appDispatch(getUserProfileData());
        }
        getData();
    }, [])

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                className={classes.card}
            >

                <div style={{ marginTop: 10 }} />
                <AutoComplete
                    label="Snooze Reason"
                    placeHolder="Select Field"
                    value={state.comp}
                    options={[{ label: "Delhi", value: 'yahoo' }]}
                    onChange={(value: OptionType) => {
                        setState({
                            ...state,
                            comp: value,
                            selectedcomp: value
                        })
                    }}
                />

                <div style={{ marginTop: 10 }} />
                <EditText
                    label="Order Code"
                    placeholder="Enter Order Code"
                    value={state.query}
                    maxLength={50}
                    onChange={(text: string) => {
                        setState({
                            ...state,
                            query: text,
                        })
                    }}
                />

                <div style={{ marginTop: 20 }} />
                <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={handleChange}
                />
                <div style={{ marginTop: 10 }} />
                <CustomToolTip
                    title={'element.address'}
                >
                    <div>
                        <label className="label">
                            "Destination"
                        </label>
                    </div>
                </CustomToolTip>

                <div style={{ marginTop: 10 }} />
                <Button
                    buttonStyle={"btn-orange icon-list"}
                    title={"Hello"}
                    aria-controls="customized-action"
                    aria-haspopup="true"
                    onClick={() => {
                        appDispatch(showAlert('Data saved'))
                    }}

                />
            </Card>
        </Box>
    );
}

export default DashBoard;
