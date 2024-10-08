import StarTrailFooter from '../../Components/StarTrailFooter';
import StarTrailHeader from '../../Components/StarTrailHeader';
import TrailCreationForm from '../../Components/TrailCreationForm'
import './CreateTrail.css'

function CreateTrail() {
  return (
    <main id='create-trail-page'>
      <StarTrailHeader />
      <TrailCreationForm />
      <StarTrailFooter />
    </main>
  );
}

export default CreateTrail;
