import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const CheckTool = () => {
        const [checkedList, setCheckedList] = useState(defaultCheckedList);
        const checkAll = plainOptions.length === checkedList.length;
        const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
        const onChange = (list) => {
                setCheckedList(list);
        };
        const onCheckAllChange = (e) => {
                setCheckedList(e.target.checked ? plainOptions : []);
        };
        return (
                <>
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                Check all
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                </>
        );
};
export default CheckTool;