import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default function SwitchesGroup({ setAnonymous }) {
  const [state, setState] = React.useState(false);

  const handleChange = (event) => {
      setAnonymous(!state);
      setState(!state)
  };

  return (   
      
        <FormControlLabel className="profile-switch" 
          control={<Switch checked={state} onChange={handleChange}  color="primary" />}
          label="anonymous"
        />
  );
}
