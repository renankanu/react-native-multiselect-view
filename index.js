/**
 * react-native-multiselect-view
 * Customizable list component with complex content for react native, it works on iOS and Android
 * https://github.com/fukhaos/react-native-multiselect-view
 * Email:fukhaos@gmail.com
 * Profile:https://www.linkedin.com/in/fukhaos/
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

export default class MultiSelectView extends Component {
	constructor(props) {
		super(props);
		this.onTouch = this.onTouch.bind(this);

		this.state = {data: []}
		
		this.update(props.data);
	}

	update(data){

		let newData = [];
		data.forEach(
			(item) => {
				if (typeof (item) != 'string' && typeof (item) != 'number') {
					newData.push({ ...item, value: item[this.props.valueKey], checked: false });
				}
				else {
					newData.push({ value: item, checked: false });
				}
			}
		)
		this.state = {data: newData}
		this.setState({data: newData})
	}

	
	onTouch(status, index) {
		const { data } = this.state;
		data[index].checked = status;
		this.setState({ data });
		if (this.props.onSelectionStatusChange) {
			this.props.onSelectionStatusChange(status, index, data[index]);
		}
	}
	selectedItems() {
		const { data } = this.state;
		return data.filter((item) => item.checked).map((item) => {
			return item;
		});
	}
	render() {
		const { data } = this.state;
		const { activeView, desactiveView, activeIcon, inactiveIcon, inactiveContainerStyle, activeContainerStyle, activeTextStyle, inactiveTextStyle } = this.props;
		return (
			<View style={{ ...this.props.style, flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
				{data && data.map((item, index) => 
				<ListItem
					key={index}
					index={index}
					item={item}
					text={item.value}
					checked={item.checked}
					activeView={activeView}
					desactiveView={desactiveView}
					onTouch={this.onTouch}
					activeContainerStyle={activeContainerStyle}
					inactiveContainerStyle={inactiveContainerStyle}
					activeTextStyle={activeTextStyle}
					inactiveTextStyle={inactiveTextStyle}
					activeIcon={activeIcon}
					inactiveIcon={inactiveIcon}
				/>
				)}

			</View>
		);
	}
}


MultiSelectView.propTypes = {
	...TouchableOpacity.propTypes,
	activeContainerStyle: ViewPropTypes.style,
	inactiveContainerStyle: ViewPropTypes.style,
	activeTextStyle: Text.propTypes.style,
	inactiveTextStyle: Text.propTypes.style,
	activeIcon: PropTypes.element,
	inactiveIcon: PropTypes.element,
	onSelectionStatusChange: PropTypes.func,
	valueKey: PropTypes.string,
	data: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
	).isRequired,
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
