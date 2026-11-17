import React from 'react'
import CertificateCard from '../../components/CertificateCard/CertificateCard'

const Certificates = () => {
  return (
    <div>
      <h1>My Certificates</h1>
      <div className="certificate-grid">
        <CertificateCard/>
        <CertificateCard/>
        <CertificateCard/>
      </div>
    </div>
  )
}

export default Certificates
