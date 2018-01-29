from setuptools import setup, find_packages

setup(
    name='caktus-primer',
    version='0.1',
    author='Caktus Consulting Group',
    author_email='solutions@caktusgroup.com',
    packages=find_packages(exclude=['sample_project']),
    include_package_data=True,
    url='http://github.com/caktus/caktus-primer/',
    license='BSD',
    description='Out-of-the-box styles for new Caktus projects',
    classifiers=[
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Development Status :: 4 - Beta',
        'Operating System :: OS Independent',
    ],
    #long_description=open('README.rst').read(),
    # install_requires=[
    #     "markdown",
    # ],
    zip_safe=False, # because we're including media that Django needs
)
