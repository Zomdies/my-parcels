import React, {  useState, useEffect } from 'react';

import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage'
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot'
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader'
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton'
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow'

import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

import '../css/Card_Info.css'

// function load_info(setPopout,chooseParcels,setParcelsData){
//     fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/trackers/"+chooseParcels[1]+"/"+chooseParcels[2])
//     .then(response => response.json())
//     .then(result =>{
//         try{
//             if (result.status) {setParcelsData(null);
//                 console.log(result)}
//                 else{
//                     console.log(result)
// 					setParcelsData(result);
					
//                 }
//         }catch{
//         }
//         setPopout(null);

//     }).catch(err => console.log(err))
// }

const Card_Info = props => {
    var Barcode = require('react-barcode');

	
    

    // useEffect(() => {
    //     load_info(props.setPopout,props.chooseParcels,setParcelsData);
    // }, []);

    // const open_information = () =>{
	// 	if (props.chooseParcels != null) {
	// 		// console.log(chooseParcels);
	// 		props.setPopout(<ScreenSpinner size='large' />);
	// 		load_info(props.setPopout,props.chooseParcels,setParcelsData);
	// 	}
		
	// }

    const closeModal = () =>{
		props.setActiveModal(null);
		console.log(props.parcelsData);
	} 
	const go = (string) =>{
		props.setActivePanel(string)
	}
    return (
        <ModalRoot activeModal={props.activeModal}>
				<ModalPage id ="modal_inform"
				onClose={closeModal}
				header={
					<ModalPageHeader className="ModalHaeder"
						left={<HeaderButton onClick={closeModal}><Icon24Cancel /></HeaderButton>}
              			right={<HeaderButton onClick={closeModal}><Icon24Done /></HeaderButton>}
					>Information</ModalPageHeader>
				}>
					<FormLayout className="ModalBody">
						
					{props.parcelsData &&
							<div>
								<p>Название посылки : {props.chooseParcels[0]}</p>
								<p>Номер отслеживания : {props.chooseParcels[2]}</p>
								{props.parcelsData &&
									<div className="ModalDopInfo">
										
										<p className="ModalDopInfoTime">Время в пути : {props.parcelsData.deliveringTime} дней</p>
										<p className="ModalDopInfoWeight">Вес посылки : {props.parcelsData.weight} кг.</p>
																				
										
									</div>
								}
								
								<Barcode value={props.chooseParcels[2]} background="white"></Barcode>
								{props.parcelsData && props.parcelsData.events[0] &&
									<InfoRow className="Status" >Статус отслеживания : {props.parcelsData.events[0].operation}</InfoRow>
								}
								{props.parcelsData && Object.keys(props.parcelsData.events).length == 0 &&
									<InfoRow>Статус отслеживания : информации пока нет</InfoRow>
								}
								
								
							</div>
							
							}
						
						<Button size="xl" onClick={() => {
												props.setDataToInfo(props.parcelsData);
												go("moreInfo")
												}}>Больше информации</Button>
						<Button size="xl" onClick={() => {
												props.setDataToDelete(props.chooseParcels);
												go("setting_card")}} >Удалить</Button>
					</FormLayout>
				</ModalPage>
			</ModalRoot>
    );

}

export default Card_Info;