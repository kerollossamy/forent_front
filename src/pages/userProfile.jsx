import { Container, Row, Col, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/userProfile.css';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../Components/loadingScreen';
import { format } from 'date-fns';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/${userId}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <LoadingScreen />;

  return userData && (
    <Container fluid className='mt-3'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <div>
            <div className="circle-image text-center">
              <Image src={userData.profile_picture} alt="" className="img-thumbnail" />
              <p className='title'>{userData.name}</p>
              <p className='sub-title'>{userData.role}</p>
            </div>

            <div className="my-3 text-center icons-container">
              <i className="profile-icon my-1 mx-2 far fa-edit"></i>
              <i className="profile-icon my-1 mx-2 fas fa-plus"></i>
              <i className="profile-icon my-1 mx-2 far fa-envelope"></i>
              {userData.phone_number && <i className="profile-icon my-1 mx-2 fas fa-phone-alt"></i>}
            </div>

            <h5 className='sub-title my-2'>Information</h5>
            <div className="information-content pt-2">
              <div className="flex-container">
                <p><b>Username: &#160;</b> {userData.username}</p>
                <p><b>Email: &#160;</b> {userData.email}</p>
                {userData.phone_number && <p><b>Phone: &#160;</b> {userData.phone_number}</p>}
                <p><b>Created at: &#160;</b> {format(new Date(userData.registration_date), 'dd MMM, yyyy')}</p>
              </div>
            </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;