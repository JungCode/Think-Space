
const EditorHeader = ({ roomId }: { roomId: string }) => {
  // const { getToken } = useAuth();
  // const [token, setToken] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await getToken();
  //     setToken(token);
  //   };
  //   fetchToken();
  // }, []);
  console.log(roomId);
  return (
    <div className="border-b-2 p-1 flex justify-end">
      <button className="bg-neutral-500">invite user</button>
    </div>
  );
};

export default EditorHeader;
