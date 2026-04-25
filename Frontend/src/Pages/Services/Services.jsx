import React from 'react';
import './Services.css';
import ServiceTile from '../../components/ServiceTile/ServiceTile';
import servicesData from '../../data/servicesData';
import ServicesMaterialCard from '../../components/ServicesMaterialCard/ServicesMaterialCard';
import materialsData from '../../data/materialsData';
import ServiceKeypoints from '../../components/ServiceKeypoints/ServiceKeypoints';
import keypointsData from '../../data/keypointsData';
import trucks from '../../assets/Trucks.png'
import Footer from '../../components/Footer/Footer';

function Services() {
	return (
		<>
			<section className='services-section'>
				<div className='services-box'>
					<h1 className='services-heading'> Our <span className='imp'> Services </span> </h1>
					<p className='services-content'> Comprehensive scrap management solutions designed to make recycling simple, profitable, and environmentally responsible. </p>
				</div>

				<div className='services-grid'>
					{servicesData.map((service) => (
						<ServiceTile
							key={service.title}
							icon={service.icon}
							title={service.title}
							description={service.content}
							points={service.points}
						/>
					))}
				</div>
			</section>

			<section className='materials-section'>
				<div className='materials-box'>
					<div className='materials-content'>
						<h2 className='materials-heading'>Materials We Accept</h2>
						<p className='materials-desc'>We handle a wide range of recyclable materials with expertise and care</p>
					</div>

					<div className='serv-materials-list'>
						{materialsData.map((material) => (
							<ServicesMaterialCard
								key={material.title}
								title={material.title}
								desc={material.desc}
							/>
						))}
					</div>
				</div>
			</section>

			<section className='unique-service'>
				<div className='unique-service-content'>
					<img src={trucks} alt="Recycling bins and scrap materials" className='scrap' />
					<div className='service-keypoints'>
						<h2 className='unique-heading'> Why Our Services Stand Out </h2>
						{keypointsData.map((keypoint) => (
							<ServiceKeypoints
								key={keypoint.title}
								icon={keypoint.icon}
								title={keypoint.title}
								desc={keypoint.description}
							/>
						))}
					</div>
				</div>
			</section>

			<section className='footer-section'>
				<Footer />
			</section>
		</>
	);
}

export default Services;
