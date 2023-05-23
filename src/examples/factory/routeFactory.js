// 假设我们有一个页面组件
function HomePage() {
  return "This is the home page";
}

function AboutPage() {
  return "This is the about page";
}

// 创建一个路由类
class Route {
  constructor(url, component) {
    this.url = url;
    this.component = component;
  }

  navigate() {
    console.log(this.component());
  }
}

// 创建一个工厂类来生成路由
class RouteFactory {
  static createRoute(url, component) {
    return new Route(url, component);
  }
}

// 使用工厂创建路由
const homeRoute = RouteFactory.createRoute("/home", HomePage);
const aboutRoute = RouteFactory.createRoute("/about", AboutPage);

// 模拟导航
console.log("Navigating to /home:");
homeRoute.navigate();
console.log("Navigating to /about:");
aboutRoute.navigate();
