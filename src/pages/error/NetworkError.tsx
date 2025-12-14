import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";

const NetworkError = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col h-[60vh] justify-center items-center space-y-2">
      {/* <img src={networkErrorIcon} alt="" /> */}
      <Typography variant={"xlargeTextBold"}>
        Error Loading the Page..
      </Typography>
      <Typography className="max-w-[335px] text-center pb-4">
        It seems you are experiencing a network error. Refresh the page, let’s
        try again.
      </Typography>

      <Button onClick={onClick}>Refresh Page</Button>
    </div>
  );
};

export default NetworkError;
