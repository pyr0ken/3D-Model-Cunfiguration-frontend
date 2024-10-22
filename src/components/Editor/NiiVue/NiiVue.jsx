import React, { useEffect, useRef } from 'react';
import { Niivue } from '@niivue/niivue';

export default function NiiVueComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const nv = new Niivue({ logging: true });

    if (canvasRef.current) {
      nv.attachToCanvas(canvasRef.current);
    }

    const loadNiiGz = async () => {
      try {
        const niiUrl = '/mri/spm152.nii.gz'; // Update this path

        const volume = {
          url: niiUrl,
          colorMap: 'gray',
          opacity: 1,
          name: 'brain',
        };

        console.log("Loading volume:", volume);

        await nv.addVolume(volume);
        nv.updateGLVolume();
      } catch (error) {
        console.error("Error during volume load:", error);
      }
    };

    loadNiiGz();

    return () => {
      nv.destroy();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
}
