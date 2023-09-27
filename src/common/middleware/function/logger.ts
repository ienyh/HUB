export default function logger(req, res, next) {
  console.log(`Request...`);
  next();
}
