import { Gear } from "@phosphor-icons/react";
import { useState } from "react";
import { IconX } from "src/components/Icons/IconX";
import "../../Management.css";
import { SelectUser } from "../components/SelectUser";
import { FormCreateClient } from "./FormCreateClient";
import { FormCreateEmployee } from "./FormCreateEmployee";

export const UserCreate = () => {
  const [access, setAccess] = useState("Cliente");
  const [user, setUser] = useState("Usuário");

  const handleUserTypeSelect = (option: string) => {
    setAccess(option);
  };

  const MainDiv = () => (
    <div className="flex w-full flex-col items-start justify-between md:flex-row">
      <h4 className="md:w-max-80 w-full truncate text-start text-write-primary md:w-80">{user}</h4>
      <div className="flex gap-1">
        <SelectUser setAccess={handleUserTypeSelect} access={access} />
        <IconX
          name="Editar"
          icon={
            <Gear
              className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
              width={19.45}
              height={20}
              weight="fill"
            />
          }
        />
      </div>
    </div>
  );

  return access === "Cliente" ? (
    <FormCreateClient MainDiv={MainDiv} setUser={setUser} />
  ) : (
    <FormCreateEmployee MainDiv={MainDiv} setUser={setUser} />
  );
};