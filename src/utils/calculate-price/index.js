const calculatePrice = ({ public_repos, followers, following }) => {
  return public_repos * 3 + followers * 5 + following * 1;
};

export default calculatePrice;