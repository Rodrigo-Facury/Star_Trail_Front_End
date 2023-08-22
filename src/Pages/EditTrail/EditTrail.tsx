import { useParams } from 'react-router-dom';
import StarTrailFooter from '../../Components/StarTrailFooter';
import StarTrailHeader from '../../Components/StarTrailHeader';
import TrailCreationForm from '../../Components/TrailCreationForm'
import './EditTrail.css'

function EditTrail() {
  const { trailId } = useParams()

  return (
    <main id='edit-trail-page'>
      <StarTrailHeader />
      <TrailCreationForm trailId={Number(trailId)} />
      <StarTrailFooter />
    </main>
  );
}

export default EditTrail;
