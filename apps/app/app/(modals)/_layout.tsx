import { Slot } from "expo-router";

import { Modal } from "../../components/Modal";

export default function Modals() {
  return (
    <Modal>
      <Slot />
    </Modal>
  );
}
