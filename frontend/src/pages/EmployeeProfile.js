import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeId } from '../actions/employeeActions';
import AddCertification from '../components/AddCertification';
import AddEducation from '../components/AddEducation';
import AddProject from '../components/AddProject';
import html2pdf from 'html2pdf.js';

const EmployeeProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    skills: [],
    education: [],
    experience: [],
    certifications: [],
    projects: [],
  });

  const [newSkill, setNewSkill] = useState('');

  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showAddEducationForm, setShowAddEducationForm] = useState(false);
  const [showAddCertificationForm, setShowAddCertificationForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    dispatch(fetchEmployeeId(userInfo.token));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios.get('/api/employees/profile', config)
      .then((response) => setProfileData(response.data))
      .catch((error) => console.error(error));
  }, [userInfo, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios.put('/api/employees/profile', profileData, config)
      .then((response) => console.log('Profile updated successfully'))
      .catch((error) => console.error(error));
  };

  const handleAddSkill = () => {
    setProfileData({ ...profileData, skills: [...profileData.skills, newSkill] });
    setNewSkill('');
    setShowAddSkillForm(false);
  };

  const handleAddEducation = (newEducation) => {
    setProfileData({ ...profileData, education: [...profileData.education, newEducation] });
    setShowAddEducationForm(false);
  };

  const handleAddCertification = (newCertification) => {
    setProfileData({ ...profileData, certifications: [...profileData.certifications, newCertification] });
    setShowAddCertificationForm(false);
  }

  const handleAddProject = (newProject) => {
    setProfileData({ ...profileData, projects: [...profileData.projects, newProject] });
    setShowAddProjectForm(false);
  };

  const handleDownloadResume = () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="flex items-center justify-center">
        <div class="container max-w-4xl w-full mx-auto rounded">
          <h2 class="text-2xl font-bold text-center uppercase">${profileData.fullName}</h2>
          <p class="text-base text-center">${userInfo.email}</p>
          
          <div class = "p-8">
          <hr />
          ${profileData.skills && profileData.skills.length > 0 ? `
            <div class="mb-4 mt-4 text-gray-500 flex items-start">
              <label class="block mb-4 w-1/3 text-base">Skills:</label>
              <div class="flex items-start w-2/3">
                ${profileData.skills.map((skill, index) => (
                  `<div key=${index} class="flex items-center mb-2">
                    <span class="mr-2 text-base">${skill}</span>
                  </div>`
                ))}
              </div>
            </div>
            <hr />
          ` : ''}
  
          ${profileData.education && profileData.education.length > 0  ? `
            <div class="mb-4 mt-4 text-gray-500 flex items-start">
              <label class="block mb-4 w-1/3 text-base">Education:</label>
              <div class="flex flex-col items-start w-2/3">
                ${profileData.education.map((edu, index) => (
                  `<div key=${index} class="mb-2">
                    <p class="font-semibold text-black text-base">${edu.degree}</p>
                    <p class="text-base">${edu.institution}</p>
                    <p class="text-base">Year of completion: ${edu.graduationYear}</p>
                  </div>`
                ))}
              </div>
            </div>
            <hr />
          ` : ''}
  
          ${profileData.projects && profileData.projects.length > 0  ? `
            <div class="mb-4 mt-4 flex items-start">
              <label class="block mb-4 text-gray-500 w-1/3 text-base">Projects:</label>
              <div class="flex flex-col w-2/3 items-start">
                ${profileData.projects.map((project, index) => (
                  `<div key=${index} className="mb-2">
                    <p class="font-semibold text-base">${project.title}</p>
                    <p class="text-base">${project.description}</p>
                    <p class="text-base">${project.startDate} - ${project.endDate}</p>
                  </div>`
                ))}
              </div>
            </div>
            <hr />
          ` : ''}
  
          ${profileData.certifications && profileData.certifications.length > 0 ? `
            <div class="mb-4 mt-4 text-gray-500 flex items-start">
              <label class="block mb-4 w-1/3 text-base">Certifications:</label>
              <div class="flex flex-col w-2/3 items-start">
              ${profileData.certifications.map((certification, index) => (
                `<div key=${index} className="mb-2">
                  <p class="font-semibold text-base">${certification.title}</p>
                  <p class="text-base">${certification.issuer}</p>
                  <p class="text-base">${certification.issueDate}</p>
                </div>`
              ))}
            </div>
            </div>
            <hr />
          ` : ''}
          </div>
        </div>
      </div>
    `;
  
    // Convert HTML to PDF using html2pdf
    html2pdf(container, {
      margin: 10,
      filename: 'employee_resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
  };
  
  return (
    <div className="flex items-center justify-center mb-6 mt-6">
      <div className="container max-w-2xl w-full mx-auto p-8 border border-gray-300 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <hr />
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            <label className="block w-1/4 py-2 text-base" htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              className="w-3/4 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 w-3/4 text-base"
            />
          </div>
          <hr />
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            <label className="block mb-4 w-1/4 text-base">Skills:</label>
            <div className="flex flex-col items-start w-3/4">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2 text-base">{skill}</span>
                </div>
              ))} 
              {showAddSkillForm ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300 text-base"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddSkillForm(true)}
                  className="text-blue-500 hover:underline focus:outline-none text-base"
                >
                  + Add Skill
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            <label className="block mb-4 w-1/4 text-base">Education:</label>
            <div className="flex flex-col items-start w-3/4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold text-black text-base">{edu.degree}</p>
                  <p className="text-base">{edu.institution}</p>
                  <p className="text-base">Year of completion: {edu.graduationYear}</p>
                </div>
              ))}
              {showAddEducationForm ? (
                <AddEducation
                  isOpen={showAddEducationForm}
                  onClose={() => setShowAddEducationForm(false)}
                  onAddEducation={handleAddEducation}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddEducationForm(true)}
                  className="text-blue-500 hover:underline focus:outline-none text-base"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            <label className="block mb-4 w-1/4 text-base">Certifications:</label>
            
              {profileData.certifications.map((certification, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold text-base">{certification.title}</p>
                  <p className="text-base">{certification.issuer}</p>
                  <p className="text-base">{certification.issueDate}</p>
                </div>
              ))}
              {showAddCertificationForm ? (
                <AddCertification
                  isOpen={showAddCertificationForm}
                  onClose={() => setShowAddCertificationForm(false)}
                  onAddCertification={handleAddCertification}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddCertificationForm(true)}
                  className="text-blue-500 hover:underline focus:outline-none text-base"
                >
                  + Add Certification
                </button>
              )}
            </div>
          <hr />
          <div className="mb-4 mt-4 flex items-start">
            <label className="block mb-4 text-gray-500 w-1/4 text-base">Projects:</label>
            <div className="flex flex-col w-3/4 items-start">
              {profileData.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold text-base">{project.title}</p>
                  <p className="text-base">{project.description}</p>
                  <p className="text-base">{project.startDate} - {project.endDate}</p>
                </div>
              ))}
              {showAddProjectForm ? (
                <AddProject
                  isOpen={showAddProjectForm}
                  onClose={() => setShowAddProjectForm(false)}
                  setProfileData={setProfileData}
                  handleAddProject={handleAddProject}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddProjectForm(true)}
                  className="text-blue-500 hover:underline focus:outline-none text-base"
                >
                  + Add Project
                </button>
              )}
            </div>
          </div>
          <hr />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mb-4 mt-4 text-base "
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleDownloadResume}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300 mb-4 mt-4 text-base "
          >
            Download Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfile;
