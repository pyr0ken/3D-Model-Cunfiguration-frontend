import { Html } from "@react-three/drei";

export default function HelperText() {
  return (
    <Html className="HelpText" center>
      <h2 style={{ textAlign: "center" }}>Helper</h2>
      <ul>
        <li>
          <strong>shift + left click on model:</strong> add point
        </li>
        <li>
          <strong>right click on points:</strong> add note to selected point
        </li>
        <li>
          <strong>ctrl + Z:</strong> undo point
        </li>
        <li>
          <strong>mouse wheel:</strong> zoom in and zoom out
        </li>
      </ul>
    </Html>
  );
}
