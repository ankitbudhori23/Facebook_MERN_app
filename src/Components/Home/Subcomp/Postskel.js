import Skeleton from "@mui/material/Skeleton";

const Postskel = () => {
  return (
    <div className="post_area">
      <div className="post_card">
        <div className="post_card_userinfo">
          <div className="post_cinfo_f">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <div>
              <Skeleton
                animation="wave"
                height={30}
                width={300}
                style={{ marginLeft: 10, marginTop: -6 }}
              />
              <Skeleton
                animation="wave"
                height={25}
                width={200}
                style={{ marginLeft: 10, marginTop: -6 }}
              />
            </div>
          </div>
        </div>

        <div className="post_card_userheader">
          <Skeleton
            animation="wave"
            height={70}
            width="100%"
            style={{ marginTop: -20 }}
          />
        </div>
        <div className="post_card_userimage">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={300}
            style={{ marginTop: -20 }}
          />
        </div>

        <div className="post_card_userbtn">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={20}
            width="95%"
            style={{ marginBottom: 15, marginTop: 15 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Postskel;
