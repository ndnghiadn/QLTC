import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>QLTC</BreadcrumbItem>
                <BreadcrumbItem ></BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}

export default Header;