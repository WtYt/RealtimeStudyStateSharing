const [newMember, setNewMember] = useState([]);

export const SetInRoomMembers = (member) => {
  const new_member = member;
  setNewMember(new_member);
};

export const GetInRoomMembers = () => {
  return newMember;
};
