export default class Data {
  api(endpoint, method = 'GET', body = null, authenticate = false, credentials = null) {
    const url = 'http://localhost:5000/api' + endpoint;

    const options = {
      method,
      headers: {
        'Content-type': 'application/json'
      }
    };

    if (body) options.body = JSON.stringify(body);

    if (authenticate) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, { emailAddress, password });

    if (response.status === 200) return response.json().then(user => user);
    if (response.status === 401) return;
    throw new Error('Something went wrong with the server');
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);

    if (response.status === 201) return;
    if (response.status === 400) return response.json().then(errors => errors);
    throw new Error('Something went wrong with the server');
  }

  async getCourses() {
    const response = await this.api(`/courses`);

    if (response.status === 200) return response.json().then(courses => courses);
    if (response.status === 400) return;
    throw new Error('Something went wrong with the server');
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);

    if (response.status === 200) return response.json().then(course => course);
    if (response.status === 400 || response.status === 404) return;
    throw new Error('Something went wrong with the server');
  }

  async createCourse(course, currentUser) {
    const response = await this.api('/courses', 'POST', course, true, currentUser);

    if (response.status === 201) return;
    if (response.status === 400) return response.json().then(errors => errors);
    throw new Error('Something went wrong with the server');
  }

  async updateCourse(course, currentUser) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, currentUser);
    return response;
  }

  async deleteCourse(id, currentUser) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, currentUser);
    return response;
  }
}
